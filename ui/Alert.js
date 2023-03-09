import { useAppContext } from "../context/appContext"

const Alert = () => {
  const { alertType, alertText } = useAppContext()
  return (
    <div className={`w-full p-2 text-white font-semibold ${alertType === 'danger' ? 'bg-orange-500' : alertType === 'success' ? 'bg-green-400' : ''  }`}>{alertText}
    </div>
  );
}

export default Alert