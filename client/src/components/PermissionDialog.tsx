
interface PermissionDialogProps {
  showPermissionDialog: boolean;
  handlePermissionGrant: () => void;
  setShowPermissionDialog: (show: boolean) => void;
}

const PermissionDialog: React.FC<PermissionDialogProps> = ({
  showPermissionDialog,
  handlePermissionGrant,
  setShowPermissionDialog,
}) => {
  if (!showPermissionDialog) return null;

  return (
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
  );
};

export default PermissionDialog; 