import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
   return (
      <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
         <Image src={data.avatar} alt={data.avatar} className={cx('avatar')} />
         <div className={cx('info')}>
            <p className={cx('name')}>
               <span>{data.full_name}</span>
               {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('tick')} />}
            </p>
            <span className={cx('username')}>{data.nickname}</span>
         </div>
         <FontAwesomeIcon icon={faEllipsis} className={cx('ellipsis')} />
      </Link>
   );
}

AccountItem.propTypes = {
   data: PropTypes.object.isRequired,
};

export default AccountItem;
