import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function EmojiPicker({ onEmojiClick, sendMessage }) {
    const [show, setShow] = useState(false);
    return (
        <Button variant="ghost" type="submit" onClick={sendMessage}>
            {show ? (
                <div onMouseLeave={() => setShow(false)}>
                    <Picker
                        onEmojiClick={onEmojiClick}
                        disableAutoFocus={true}
                        skinTone={SKIN_TONE_MEDIUM_DARK}
                        groupNames={{ smileys_people: 'PEOPLE' }}
                        native
                    />
                </div>
            ) : (
                <ExternalLinkIcon />
            )}
        </Button>
    )
}

