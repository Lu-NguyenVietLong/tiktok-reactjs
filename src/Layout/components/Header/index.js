import {
   faEllipsisVertical,
   faLanguage,
   faQuestion,
   faKeyboard,
   faCircleUser,
   faGear,
   faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { MessagesIcon, MailboxIcon } from '~/components/Icon';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEM = [
   {
      icon: <FontAwesomeIcon icon={faLanguage} />,
      title: 'English',
      children: {
         title: 'Language',
         data: [
            {
               type: 'languages',
               code: 'en',
               title: 'English',
            },
            {
               type: 'languages',
               code: 'vi',
               title: 'Vietnamese',
            },
         ],
      },
   },
   {
      icon: <FontAwesomeIcon icon={faQuestion} />,
      title: 'Feedback and Help',
      to: '/feedback',
   },
   {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: 'Keyboard shortcuts',
   },
];

function Header() {
   const currentUser = true;

   const handleMenuChange = (menuItem) => {
      switch (menuItem.type) {
         case 'languages':
            break;
         default:
            console.log('error');
      }
   };

   const userMenu = [
      {
         icon: <FontAwesomeIcon icon={faCircleUser} />,
         title: 'View profile',
         to: '/@longkhonglu',
      },
      {
         icon: <FontAwesomeIcon icon={faBitcoin} />,
         title: 'Get coins',
         to: '/coins',
      },
      {
         icon: <FontAwesomeIcon icon={faGear} />,
         title: 'Setting',
         to: '/setting',
      },
      ...MENU_ITEM,
      {
         icon: <FontAwesomeIcon icon={faSignOut} />,
         title: 'Log out',
         to: '/',
         separate: true,
      },
   ];

   return (
      <header className={cx('wrapper')}>
         <div className={cx('inner')}>
            <Link to={config.routes.home} className={cx('logo')}>
               <img src={images.logo} alt="TikTOk" />
            </Link>
            {/* Search */}
            <Search />
            <div className={cx('actions')}>
               {currentUser ? (
                  <>
                     <Button text>Upload</Button>
                     <Tippy delay={[0, 200]} content="Mailbox" placement="bottom">
                        <button className={cx('actions-btn', 'notify-quantity-icon')}>
                           <MessagesIcon />
                           <span>3</span>
                        </button>
                     </Tippy>
                     <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                        <button className={cx('actions-btn', 'notify-quantity-icon')}>
                           <MailboxIcon />
                           <span>8</span>
                        </button>
                     </Tippy>
                  </>
               ) : (
                  <>
                     <Button text>Upload</Button>
                     <Button primary>Log in</Button>
                  </>
               )}
               <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                  {currentUser ? (
                     <Image
                        className={cx('user-avatar')}
                        src="https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg"
                        alt=""
                     />
                  ) : (
                     <button className={cx('more')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                     </button>
                  )}
               </Menu>
            </div>
         </div>
      </header>
   );
}

export default Header;
