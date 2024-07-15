import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateNewLinkModal } from "./create-new-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Links {
    id: string
    title: string
    url: string
}

export function ImportantLinks() {
    const [isCreateNewLinkModalOpen, setIsCreateNewLinkModalOpen] = useState(false)
    const [links, setLinks] = useState<Links[]>([])

    const { tripId } = useParams()

    function openCreateNewLinkModalOpen() {
        setIsCreateNewLinkModalOpen(true)
    }

    function closeCreateNewLinkModalOpen() {
        setIsCreateNewLinkModalOpen(false)
    }

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))

    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                {links.map(link => {
                    return (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                                <span className="block font-medium text-zinc-100">{link.title}</span>
                                <a href="#" className="block text-sm text-zinc-400 truncate hover:text-zinc-500"
                                >{link.url}
                                </a>
                            </div>
                            <Link2 className="size-5 text-zinc-400" />
                        </div>
                    )
                })}
            </div>

            <Button onClick={openCreateNewLinkModalOpen} variant="secondary" size="full">
                <Plus className='size-5' />
                cadastrar novo link
            </Button>

            {isCreateNewLinkModalOpen && (
                <CreateNewLinkModal
                    closeCreateNewLinkModalOpen={closeCreateNewLinkModalOpen}
                />
            )}
        </div>
    )
}