import React, { useContext, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InputSelect } from "../../Material/InputSelect";
import { contratos } from "../../../utils/arrays";
import { ButtonSend } from "../../Material/ButtonSend";
import { BiExit as Salir } from 'react-icons/bi';
import { InputNumber } from "../../Material/InputNumber";
import { formatoPesosArgentinos } from "../../../utils/utils";
import { ofertaPost } from "../../../service/jugadores";
import { BsCashCoin as Cash } from 'react-icons/bs';
import { crearOferta } from "../../../utils/utilsPanelJugadores";
import ContextRefac from "../../../context/contextLogin";
import { equiposGet } from "../../../service/equipos";
import { InputTexArea } from "../../Material/InputTexArea";
import Context from "../../../context/contextPrincipal";

interface Equipo {
    correo: string;
    logo: any
}

export const ModalOferta = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(null);
    const [contrato, setContrato] = useState('Seleccionar');
    const [precio, setPrecio] = useState('');
    const [comentario, setComentario] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: oferta } = useMutation(ofertaPost);
    const { state: { user } }: any = useContext(ContextRefac);
    const [equipo, setEquipo] = useState<Equipo[]>([]);

    const { isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEquipo(data);
        },
    })

    const filterEstado = () => {
        const newFilter = equipo?.filter(data => data.correo == user?.email);
        return newFilter;
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {`Negociar compra por ${data.name}`}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.transferible === 'No' && <Grid item sx={{ color: 'var(--neutral)' }}>{`El monto minimo para negociar con ${data.name} es de ${formatoPesosArgentinos(data.valor_mercado)}, el jugador no esta en venta pero puedes enviarte una oferta. (en este caso es recomendable pagar la clausula, quizas acepte)`}</Grid>}
                    {data.transferible === 'Si' && <Grid item sx={{ color: 'var(--neutral)' }}>{`El monto minimo para negociar con ${data.name} es de ${formatoPesosArgentinos(data.valor_mercado)}, el jugador esta en venta, podes ofrecer un precio sin necesidad de pagar clausula`}</Grid>}
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputNumber disable={false} placeholder={'Sueldo'} label={'Sueldo'} setValue={setSueldo} value={sueldo} />
                        <InputSelect disable={false} label={'Contrato'} value={contrato} setValue={setContrato} selectData={contratos} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputNumber disable={false} placeholder={'Oferta'} label={'Oferta'} setValue={setPrecio} value={precio} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputTexArea label={'Comentario'} disable={false} placeholder={'Comentario'} value={comentario} setValue={setComentario} />
                    </Grid>
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { crearOferta(equipoId, jugadorId, user?.equipo, filterEstado()[0]?.logo, precio, contrato, 'compra', sueldo, setIsLoading, oferta, queryClient, handleClose, comentario, 'Oferta_Enviada', user?.email, user?._id) }} title={'Negociar'} icon={Cash} iconColor={'var(--check)'} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}