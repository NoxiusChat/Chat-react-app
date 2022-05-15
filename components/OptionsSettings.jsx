import {Button, OptionsSettings as options} from 'react-chat-engine';
import SettingsBlock from './SettingsBlock';
import Popup from './Popup';
import {useState} from 'react'
const OptionsSettings = ({creds, chat}) => {
    const [buttonPopup, setButtonPopup] = useState(false);
    return(
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <SettingsBlock 
                id='ce-options-drop-down'
                label='Options'
            >
                <div>
                    <div style={{ height: '8px' }} />

                    <Button 
                        value="Manage Users" 
                        theme=''
                        icon='delete'
                        id='ce-delete-chat-button'
                        style={{ width: '100%', marginBottom: '12px' }}
                        onClick={() =>{setButtonPopup(true)}}
                    />
                </div>
                
            </SettingsBlock>
            <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
            </Popup>
        </div>
    )
}
        
export default OptionsSettings;

