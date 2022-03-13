import React from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'

interface Props {
  initialAspectRatio: number;
  aspectRatio:        number;
  imagePreview:       string;
  setCropper:         (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({ initialAspectRatio, aspectRatio, imagePreview, setCropper }: Props) {
  return (
    <Cropper 
      src={imagePreview}
      style={{height: 200, width: '100%'}}
      initialAspectRatio={initialAspectRatio}
      aspectRatio={aspectRatio}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={cropper => setCropper(cropper)}
    />
  )
}
