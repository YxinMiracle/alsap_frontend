import { Skeleton } from 'antd';
import React, { useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  style?: any;
}

const ImageLoader: React.FC<Props> = (props: Props) => {
  const { src, alt, style } = props;
  const [loaded, setLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const handleImageLoaded = () => {
    setLoaded(true);
    setOpacity(1);
  };

  const imageStyle = {
    ...style,
    opacity: opacity,
    transition: 'opacity 1s ease-in-out', // 平滑过渡效果
  };

  return (
    <div style={style}>
      {!loaded && (
        <Skeleton.Image style={{ width: '400px', height: '225px' }} active={true}/>
      )}
      <img
        src={src}
        alt={alt}
        style={imageStyle}
        onLoad={handleImageLoaded}
        onError={() => setLoaded(false)}
      />
    </div>
  );
};

export default ImageLoader;
