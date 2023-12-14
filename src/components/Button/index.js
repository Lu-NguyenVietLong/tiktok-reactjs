import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
   to,
   href,
   primary = false,
   outline = false,
   rounded = false,
   text = false,
   small = false,
   large = false,
   disable,
   children,
   onClick,
   className,
   leftIcon,
   rightIcon,
   ...passProps
}) {
   let Component = 'button';
   const props = {
      onClick,
      ...passProps,
   };

   if (disable) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key];
         }
      });
   }

   if (to) {
      props.to = to;
      Component = Link;
   } else if (href) {
      props.href = href;
      Component = 'a';
   }

   const classes = cx('wrapper', {
      primary,
      outline,
      rounded,
      small,
      large,
      text,
      disable,
      [className]: className,
   });
   return (
      <Component className={classes} {...props}>
         {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
         <span className={cx('title')}>{children}</span>
         {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Component>
   );
}

Button.propTypes = {
   to: PropTypes.string,
   href: PropTypes.string,
   primary: PropTypes.bool,
   outline: PropTypes.bool,
   rounded: PropTypes.bool,
   text: PropTypes.bool,
   small: PropTypes.bool,
   large: PropTypes.bool,
   disable: PropTypes.bool,
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func,
   className: PropTypes.string,
   leftIcon: PropTypes.node,
   rightIcon: PropTypes.node,
};

export default Button;
