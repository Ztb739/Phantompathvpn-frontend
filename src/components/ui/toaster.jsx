import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-[#1a2e23] border border-[#3affc2]/30 text-white shadow-[0_0_20px_rgba(58,255,194,0.1)]">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-[#3affc2] text-sm font-bold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-gray-300 text-xs">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-gray-400 hover:text-white" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
