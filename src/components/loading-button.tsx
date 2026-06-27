import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "./ui/button";
import { Spinner } from "./ui/spinner";

type LoadingButtonProps = ButtonProps & {
     isLoading: boolean,
     loaderText?: string,
}
export default function LoadingButton({isLoading, loaderText, disabled, children, ...props}: LoadingButtonProps){
     const {t} = useTranslation()
     return (
          <Button {...props} disabled={isLoading || disabled}>
               {isLoading ? (
                    <>
                         <Spinner/>
                         {loaderText ?? t("loading")}
                    </>
               ) : children}
          </Button>
     )
}