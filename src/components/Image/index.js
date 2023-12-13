import { forwardRef, useState } from 'react';
import images from '../../assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.defaultImage, ...props }, ref) => {
   const [fallback, setFallback] = useState('');

   const handleError = () => {
      setFallback(customFallback);
   };

   return (
      <img
         className={classNames(styles.wrapper, className)}
         ref={ref}
         {...props}
         alt={alt}
         src={fallback || src}
         onError={handleError}
      />
   );
});

export default Image;
