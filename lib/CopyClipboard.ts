// Asumiendo que el tipo de las opciones es similar a este:
interface ToastOptions {
    title: string;
    description?: string;
  }
  
  export const copyClipboard = (value: string, toast: (options: ToastOptions) => void) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        toast({
          title: "Value copied ✅"
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to copy ❌",
          description: error.message,
        });
      });
  };
  