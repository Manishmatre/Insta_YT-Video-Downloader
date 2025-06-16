import { useState } from 'react'
import axios from 'axios'
import { Download, Loader2, Youtube, AlertCircle, Video, Music, Clipboard } from 'lucide-react'

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  formats: {
    quality: string
    format: string
    formatId: string
    size: string
    note: string
  }[]
}

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [selectedFormat, setSelectedFormat] = useState('')
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)

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
    try {
      const response = await axios.get(`/api/video-info?url=${encodeURIComponent(url)}`)
      setVideoInfo(response.data)
      setSelectedFormat('') // Reset selected format
    } catch (err: any) {
      const errorMessage = err.response?.data?.details || err.response?.data?.error || 'Failed to fetch video information'
      setError(errorMessage)
      console.error('Error fetching video info:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!url || !selectedFormat) {
      setError('Please select a format')
      return
    }

    setDownloading(true)
    setError('')
    setDownloadProgress(0)

    try {
      const response = await axios.post('/api/download', {
        url,
        format: selectedFormat
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
      let filename = `${videoInfo?.title || 'video'}.${selectedFormat}`
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Create download link
      const blob = new Blob([response.data], {
        type: selectedFormat === 'mp3' ? 'audio/mpeg' : 'video/mp4'
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
      setDownloadProgress(0)
    }
  }

  const handleClear = () => {
    setUrl('')
    setVideoInfo(null)
    setSelectedFormat('')
    setError('')
    setDownloading(false)
  }

  const getFormatIcon = (format: string) => {
    return format === 'mp3' ? <Music className="w-4 h-4" /> : <Video className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Youtube className="w-10 h-10 text-red-500" />
            YouTube Video Downloader
          </h1>
          <p className="text-gray-400">Download YouTube videos in your preferred format and quality</p>
        </div>
        
        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 outline-none transition-all pr-24"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {url && (
                  <button
                    onClick={handleClear}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Clear input"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handlePaste}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Paste from clipboard"
                >
                  <Clipboard className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              onClick={handleGetInfo}
              disabled={loading}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Download'}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {showPermissionDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Clipboard Access Required</h3>
                <p className="text-gray-400 mb-6">
                  To paste from your clipboard, we need your permission. This is a one-time request.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handlePermissionGrant}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
                  >
                    Allow Access
                  </button>
                  <button
                    onClick={() => setShowPermissionDialog(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {videoInfo && (
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-semibold line-clamp-2">{videoInfo.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">Duration: {videoInfo.duration}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Select Format:</label>
                  <div className="relative">
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 outline-none transition-all appearance-none pl-12"
                    >
                      <option value="">Choose format...</option>
                      <option value="mp4" className="py-2 flex items-center gap-2">
                        Video (MP4) - Best Quality
                      </option>
                      <option value="mp3" className="py-2 flex items-center gap-2">
                        Audio (MP3) - Best Quality
                      </option>
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {selectedFormat ? getFormatIcon(selectedFormat) : <Video className="w-4 h-4" />}
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {downloading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Downloading...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 transition-all duration-300 ease-out"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDownload}
                  disabled={downloading || !selectedFormat}
                  className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>Download YouTube videos in MP4 and MP3 formats</p>
          <p className="mt-2">© 2024 YouTube Video Downloader. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App 