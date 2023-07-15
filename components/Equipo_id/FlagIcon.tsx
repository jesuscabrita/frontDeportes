import Image from "next/image";
import argentinaFlag from '../../public/images/argentina.png';
import boliviaFlag from '../../public/images/bolivia.png';
import brazilFlag from '../../public/images/brazil.png';
import chileFlag from '../../public/images/chile.png';
import colombiaFlag from '../../public/images/colombia.png';
import costaricaFlag from '../../public/images/costarica.png';
import cubaFlag from '../../public/images/cuba.png';
import dominicanrepublicFlag from '../../public/images/dominicanrepublic.png';
import paraguayFlag from '../../public/images/paraguay.png';
import peruFlag from '../../public/images/peru.png';
import { useMediaQuery } from "@mui/material";

export const FlagIcon = ({ nacionalidad }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    const getImageSource = (nacionalidad) => {
        switch (nacionalidad) {
            case 'Argentina':
                return argentinaFlag;
            case 'Bolivia':
                return boliviaFlag;
            case 'Brazil':
                return brazilFlag;
            case 'Chile':
                return chileFlag;
            case 'Colombia':
                return colombiaFlag;
            case 'Costa Rica':
                return costaricaFlag;
            case 'Cuba':
                return cubaFlag;
            case 'Republica Dominicana':
                return dominicanrepublicFlag;
            case 'Paraguay':
                return paraguayFlag;
            case 'Peru':
                return peruFlag;
            default:
                return null;
        }
    };
    const imageSource = getImageSource(nacionalidad);

    if (imageSource) {
        return <Image src={imageSource} alt={nacionalidad} width={mobile ? 25 : 28} />;
    }

    return null;
};