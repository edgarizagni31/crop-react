import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from './utils/image';

export const EasyCropp = ({
  image,
  setImage,
  setShowCrop,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setShowCrop: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  const cropImage = async () => {
    setLoading(true);
    try {
      const response = await getCroppedImg(image, croppedAreaPixels, rotation);

      if (response?.url) {
        setImage(response.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowCrop(false);
    }

    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          background: '#333',
          position: 'relative',
          height: '400px',
          width: 'auto',
        }}>
        <Cropper
          cropSize={{ width: 400, height: 200 }}
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <button onClick={() => cropImage()}>Cropp</button>
    </>
  );
};
