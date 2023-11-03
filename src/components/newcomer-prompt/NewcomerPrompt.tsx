import ModalPopup from "../generic/ModalPopup";

type NewcomerPromptProps = {
    onAccept: () => void;
    onClose: () => void;
}

const NewcomerPrompt = ({ onAccept, onClose }: NewcomerPromptProps) => {
    return (
        <ModalPopup
            title="Welcome!"
            primaryButtonText="Yes, please!"
            secondaryButtonText="No, thanks"
            onButtonClick={(type) => {
                if (type === "primary") {
                    onAccept();
                }
                onClose();
            }}
        >
            <p>
                Looks like it's your first time here!<br/>
                Would you like us to add a few items to provide an example of how to use our app?<br/>
                You can always remove them all by going to {'"Settings" => "Delete data"'}
            </p>
        </ModalPopup>
    )
}

export default NewcomerPrompt;