import React, {FC, FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import styles from './ImageForm.module.css';
import Modal from '@/UI/modal/Modal';
import {useFlagsStore} from '@/store/useFlagsStore';
import ModalHeader from '@/components/modalHeader/ModalHeader';
import Avatar from '@/UI/avatar/Avatar';
import Photo from '@/assets/svg/photo.svg';
import manAvatar from '@/assets/images/manAvatar.png';
import womanAvatar from '@/assets/images/womanAvatar.png';
import Button from '@/UI/button/Button';
import {flagNames} from '@/models';
import {useImageStore} from '@/modules/imageForm/store';
import {useUserStore} from '@/store/useUserStore';
import {useRefreshStore} from '@/store/useRefreshStore';

export const ImageForm: FC = () => {
    const {flags, setFlag} = useFlagsStore();
    const {user} = useUserStore();
    const {isLoading, setImage} = useImageStore();
    const {refresh, data} = useRefreshStore();

    const [newImage, setNewImage] = useState<string | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [src, setSrc] = useState<string>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [croppedImage, setCroppedImage] = useState<string>(null)
    const [scale, setScale] = useState(1)

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rect, setRect] = useState({ x: 50, y: 50, width: 300, height: 300 });

    async function getFile() {
        const response = await fetch(newImage);
        const data = await response.blob();
        return new File([data], 'file.png');
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = await getFile();
        await setImage({id: user.id, image: file})
            .then(data => {
                setFlag(flagNames.IMAGE, false);
                refresh();
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleImageUpload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSrc(reader.result as string);
        };
        reader.readAsDataURL(newFile);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !src) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = src;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            drawRect(ctx);
        };
    }, [src, rect]);

    const drawRect = (ctx: CanvasRenderingContext2D) => {
        if (!ctx) return;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        const r = rect.width / 2;
    };

    useEffect(() => {
        if (newFile) {
            handleImageUpload();
        }
    }, [newFile]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!src) return;

        const rectX = rect.x;
        const rectY = rect.y;
        const rectWidth = rect.width;
        const rectHeight = rect.height;
        const mouseX = e.nativeEvent.offsetX;
        const mouseY = e.nativeEvent.offsetY;

        if (
            mouseX >= rectX &&
            mouseX <= rectX + rectWidth &&
            mouseY >= rectY &&
            mouseY <= rectY + rectHeight
        ) {
            setIsDragging(true);
            setDragStart({ x: mouseX - rect.x, y: mouseY - rect.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !src) return;

        const mouseX = e.nativeEvent.offsetX;
        const mouseY = e.nativeEvent.offsetY;

        setRect((prevRect) => {
            const newX = mouseX - dragStart.x;
            const newY = mouseY - dragStart.y;

            const canvasWidth = canvasRef.current?.width || 0;
            const canvasHeight = canvasRef.current?.height || 0;
            const maxX = canvasWidth - prevRect.width;
            const maxY = canvasHeight - prevRect.height;
            const limitedX = Math.max(0, Math.min(newX, maxX));
            const limitedY = Math.max(0, Math.min(newY, maxY));

            return { ...prevRect, x: limitedX, y: limitedY };
        });
    };

    const handleCrop = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !src) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = rect.width;
        croppedCanvas.height = rect.height;
        const croppedCtx = croppedCanvas.getContext('2d');

        if (!croppedCtx) return;

        croppedCtx.drawImage(
            canvas,
            rect.x + 1,
            rect.y + 1,
            rect.width - 2,
            rect.height - 2,
            0,
            0,
            rect.width,
            rect.height
        );

        const croppedImageURL = croppedCanvas.toDataURL('image/jpeg');
        setCroppedImage(croppedImageURL);

        console.log(croppedImageURL)

    }, [src, rect]);

    return (
        <div>
            {newFile &&
                <div className={styles.NewImageBox}>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    />
                    <button onClick={handleCrop}>cut</button>
                </div>
            }
            <Modal
                isVisible={flags.image}
                setIsVisible={() => setFlag(flagNames.IMAGE, false)}
                className={styles.ModalWrapper}
                classNameToWindow={styles.Modal}
            >
                <form onSubmit={e => submit(e)}>
                    <ModalHeader
                        text='New image'
                        setFlag={() => setFlag(flagNames.IMAGE, false)}
                    />
                    <div className={styles.NewImage}>
                        {newImage ?
                            <img
                                src={newImage}
                                alt='New image'
                                className={styles.Image}
                            />
                            :
                            <Avatar size={125}/>
                        }
                    </div>
                    <div className={styles.Panel}>
                        <label
                            className={styles.Button}
                            htmlFor='file'
                        >
                            <Photo className={styles.PhotoIcon}/>
                        </label>
                        <input
                            onChange={e => setNewFile(e.target.files[0])}
                            id='file'
                            type="file"
                            style={{display: 'none'}}
                        />
                        <button
                            className={styles.Button}
                            type='button'
                            onClick={() => setNewImage(manAvatar)}
                        >
                            <img
                                src={manAvatar}
                                alt="Man avatar"
                                className={styles.AvatarImage}
                            />
                        </button>
                        <button
                            type='button'
                            className={styles.Button}
                            onClick={() => setNewImage(womanAvatar)}
                        >
                            <img
                                src={womanAvatar}
                                alt="Woman avatar"
                                className={styles.AvatarImage}
                            />
                        </button>
                    </div>
                    <Button
                        size='lg'
                        variant='primary'
                        className={styles.SaveButton}
                    >
                        {isLoading ? 'Loading...' : 'Save'}
                    </Button>
                </form>
            </Modal>
        </div>
    );
};