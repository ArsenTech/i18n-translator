import { Button, ButtonProps } from "./ui/button";
import { Spinner } from "./ui/spinner";

type LoadingButtonProps = ButtonProps & {
     isLoading: boolean,
     loaderText?: string,
}
export default function LoadingButton({isLoading, loaderText="Loading...", disabled, children, ...props}: LoadingButtonProps){
     return (
          <Button {...props} disabled={isLoading || disabled}>
               {isLoading ? (
                    <>
                         <Spinner/>
                         {loaderText}
                    </>
               ) : children}
          </Button>
     )
}