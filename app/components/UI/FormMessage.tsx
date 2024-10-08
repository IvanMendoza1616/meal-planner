import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  success: boolean;
  message: string;
};

export default function Message({ success, message }: Props) {
  const { pending } = useFormStatus();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Declare timer here
    if (!pending && message) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false); // Reset message after a few seconds
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message, pending]);

  return (
    <div
      className={`flex h-[40px] items-center self-start rounded-md px-4 text-white ${
        isVisible ? (success ? "bg-green-500" : "bg-red-600") : ""
      }`}
    >
      {isVisible && (
        <div className="flex items-center gap-2">
          {success ? (
            <FontAwesomeIcon className="w-4 h-4" icon={faCheck} />
          ) : (
            <FontAwesomeIcon className="w-4 h-4" icon={faXmark} />
          )}
          {message}
        </div>
      )}
    </div>
  );
}
