import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import PermissionDialog from './components/PermissionDialog'
import VideoInfoDisplay, { VideoInfo } from './components/VideoInfoDisplay'
import Footer from './components/Footer'
import FAQSection from './components/FAQSection'
import SupportedPlatforms from './components/SupportedPlatforms'
import HeroSection from './components/HeroSection'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DMCA from './pages/DMCA'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return 'light'
  })

  // Initialize theme on mount
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  const handlePaste = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName })
      
      if (permissionStatus.state === 'granted') {
        const text = await navigator.clipboard.readText()
        setUrl(text)
      } else if (permissionStatus.state === 'prompt') {
        setShowPermissionDialog(true)
      } else {
        setError('Clipboard permission denied')
      }
    } catch (err) {
      console.error('Error accessing clipboard:', err)
      setError('Failed to access clipboard')
    }
  }

  const handlePermissionGrant = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      setShowPermissionDialog(false)
    } catch (err) {
      console.error('Error accessing clipboard:', err)
      setError('Failed to access clipboard')
      setShowPermissionDialog(false)
    }
  }

  const handleGetInfo = async () => {
    if (!url) {
      setError('Please enter a YouTube URL')
      return
    }

    setLoading(true)
    setError('')
    setSuccessMessage('')
    setIsAnalyzing(true)
    setVideoInfo(null) // Clear previous video info
    try {
      const response = await axios.get(`/api/video-info?url=${encodeURIComponent(url)}`)
      setVideoInfo(response.data)
      setSuccessMessage('Video information retrieved successfully!')
    } catch (err: any) {
      const errorMessage = err.response?.data?.details || err.response?.data?.error || 'Failed to fetch video information'
      setError(errorMessage)
      console.error('Error fetching video info:', err)
    } finally {
      setLoading(false)
      setIsAnalyzing(false)
    }
  }

  const handleDownload = async (formatId: string, formatType: string) => {
    if (!url || !formatId) {
      setError('Please select a format')
      return
    }

    setDownloading(true)
    setDownloadingFormatId(formatId) // Set the ID of the format being downloaded
    setError('')
    setSuccessMessage('')
    setDownloadProgress(0)

    try {
      const response = await axios.post('/api/download', {
        url,
        format: formatType // Use the actual format type (mp4/mp3) here
      }, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setDownloadProgress(percentCompleted)
        },
        timeout: 300000, // 5 minutes timeout
      })

      // Check if the response is actually an error message
      if (response.data.type === 'application/json') {
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result as string)
            throw new Error(errorData.error || errorData.details || 'Download failed')
          } catch (err) {
            throw new Error('Failed to download video')
          }
        }
        reader.readAsText(response.data)
        return
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers['content-disposition']
      let filename = `${videoInfo?.title || 'video'}.${formatType}`
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Create download link
      const blob = new Blob([response.data], {
        type: formatType === 'mp3' ? 'audio/mpeg' : 'video/mp4'
      })
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)

      // Show success message
      setSuccessMessage('Download completed successfully!')
      setError('')
    } catch (err: any) {
      let errorMessage = 'Failed to download video'
      
      if (err.response?.data) {
        if (err.response.data instanceof Blob) {
          // Handle blob error response
          const reader = new FileReader()
          reader.onload = () => {
            try {
              const errorData = JSON.parse(reader.result as string)
              setError(errorData.error || errorData.details || errorMessage)
            } catch {
              setError(errorMessage)
            }
          }
          reader.readAsText(err.response.data)
          return
        } else {
          errorMessage = err.response.data.error || err.response.data.details || errorMessage
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      console.error('Error downloading video:', err)
    } finally {
      setDownloading(false)
      setDownloadingFormatId(null) // Clear the downloading format ID
      setDownloadProgress(0)
    }
  }

  const handleClear = () => {
    setUrl('')
    setVideoInfo(null)
    setError('')
    setSuccessMessage('')
    setDownloading(false)
    setDownloadProgress(0)
    setDownloadingFormatId(null)
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Header theme={theme} toggleTheme={toggleTheme} />

          <Routes>
            <Route path="/" element={(
              <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-6">
                  <HeroSection
                    url={url}
                    setUrl={setUrl}
                    handlePaste={handlePaste}
                    handleClear={handleClear}
                    handleGetInfo={handleGetInfo}
                    loading={loading}
                    downloading={downloading}
                    isAnalyzing={isAnalyzing}
                    error={error}
                    successMessage={successMessage}
                  />

                  <PermissionDialog
                    showPermissionDialog={showPermissionDialog}
                    handlePermissionGrant={handlePermissionGrant}
                    setShowPermissionDialog={setShowPermissionDialog}
                  />

                  <VideoInfoDisplay
                    videoInfo={videoInfo}
                    handleDownload={handleDownload}
                    downloading={downloading}
                    downloadingFormatId={downloadingFormatId}
                    downloadProgress={downloadProgress}
                    loading={loading}
                  />
                </div>

                <FAQSection />
                <SupportedPlatforms />
              </div>
            )} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/dmca" element={<DMCA />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App 