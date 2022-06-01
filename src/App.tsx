import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { EasyCropp } from './components/EasyCropp';

function App() {
  const [image, setImage] = useState<string>('');
  const [showCrop, setShowCrop] = useState(false);

  const loadingImage: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (files?.length) {
      setImage(URL.createObjectURL(files[0]));
      setShowCrop(true);
    }
  };
  return (
    <div className='container my-4'>
      <input type='file' onChange={loadingImage} className='form-control' />
      {showCrop && image && (
        <EasyCropp
          image={image}
          setImage={setImage}
          setShowCrop={setShowCrop}
        />
      )}
      {!showCrop && image && <img src={image} alt='' />}
    </div>
  );
}

export default App;
