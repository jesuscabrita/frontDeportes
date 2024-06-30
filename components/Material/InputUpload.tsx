import React, { useContext, useRef } from "react";
import { Button, Grid } from "@mui/material";
import { IconoErrorInput } from "../../icons/icons";
import Context from "../../context/contextPrincipal";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import { IoMdImages as Images } from 'react-icons/io';

interface InputUploadProps {
    title: string;
    disabled?: boolean;
    error?: boolean;
    textError?: string;
    descripcion?: string;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imageName: string;
    setImage: React.Dispatch<React.SetStateAction<any>>;
    setImageName: React.Dispatch<React.SetStateAction<any>>;
    logoAdded: boolean;
    setLogoAdded: React.Dispatch<React.SetStateAction<any>>;
}

export const InputUpload: React.FC<InputUploadProps> = ({
    title,
    disabled = false,
    error,
    textError,
    descripcion,
    handleImageChange,
    imageName,
    setImage,
    setImageName,
    logoAdded,
    setLogoAdded,
}) => {
    const [light] = useContext(Context);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const truncateText = (text: string, maxLength: number) => {
        if (text?.length <= maxLength) {
            return text;
        }
        return text?.slice(0, maxLength) + "...";
    };

    const handleFileDelete = () => {
        setImage(null);
        setLogoAdded(false);
        setImageName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Grid item container>
            <Grid mb={0.5} sx={{ color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title}
            </Grid>
            <Button
                component="label"
                fullWidth
                sx={{
                    display: 'flex',
                    gap: '10px',
                    border: light ? '1px dashed var(--dark2)' : '1px dashed #747878',
                    color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), lineHeight: '24px', fontSize: '14px',
                    textTransform: 'math-auto !important',
                    borderRadius: '9px',
                    height: '45px'
                }}>
                {logoAdded ?
                    <Grid item container justifyContent={'space-between'} sx={{ color: 'var(--check)' }}>
                        <Grid item container xs={10} md={9} alignItems={'center'} gap={1}>
                            {truncateText(imageName, 20)}
                            <Images size={25} />
                        </Grid>
                        <Grid item container xs={1} md={1} alignItems={'center'} sx={{ color: 'var(--danger)' }}>
                            <Delete
                                size={25}
                                style={{ cursor: 'pointer' }}
                                onClick={handleFileDelete}
                            />
                        </Grid>
                    </Grid>
                    :
                    <Grid item container alignItems={'center'} gap={1}>
                        <Add size={20} />
                        Agregue el logo
                    </Grid>
                }
                <input ref={fileInputRef} hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
            </Button>
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), fontSize: '12px' }}>{descripcion}</span>
                </div>}
        </Grid>
    );
};