import { CheckCircle2, CircleDashed, UserRoundPlus, X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface UpdateGuestModalProps {
    closeUpdateGuestsModalOpen: () => void
}
interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function UpdateGuestModal({
    closeUpdateGuestsModalOpen
}: UpdateGuestModalProps) {
    const [participants, setParticipants] = useState<Participant[]>([])
    const { tripId } = useParams()

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))

    }, [tripId])


    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Gerenciar convidados</h2>
                        <button onClick={closeUpdateGuestsModalOpen}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>
                        Todos convidados podem visualizar as atividades
                    </p>
                </div>
                <div className='w-full h-px bg-zinc-800'></div>

                <form className='space-y-3'>
                    <div className="space-y-5">
                        {participants.map((participants, index) => {
                            return (
                                <div key={participants.id} className="flex items-center justify-between gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <span className="block font-medium text-zinc-100">{participants.name ?? `Convidado ${index}`}</span>
                                        <span className="block text-sm text-zinc-400 truncate">
                                            {participants.email}
                                        </span>
                                    </div>
                                    {participants.is_confirmed ? (
                                        <CheckCircle2 className="size-5 text-green-400" />
                                    ) : (
                                        <CircleDashed className="size-5 text-zinc-400" />
                                    )}
                                </div>
                            )
                        })}
                    </div>



                    <Button size="full">
                        <UserRoundPlus />
                        Salvar Alterações
                    </Button>
                </form>
            </div>
        </div>
    )
}