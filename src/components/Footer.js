import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



import { faTwitter, faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';
export default function Footer() {
    return (
        <footer>
            
    <ul className='social'>
        <li>
            <a href="https://twitter.com/daga_kotowaru2" target="_blank" >
            <FontAwesomeIcon icon={faTwitter} />
            </a>
        </li>
        <li>
            <a href="https://github.com/TenzenIga" target="_blank" >
            <FontAwesomeIcon icon={faGithub} />
            </a>
        </li>
        <li>
            <a href="tg://resolve?domain=zeta162" target="_blank">
            <FontAwesomeIcon icon={faTelegram} />
            </a>
        </li>
        </ul>
    </footer>
    )
}
