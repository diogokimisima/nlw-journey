import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationEndDateHeader } from "./destination-end-date-header";
import { Activities } from "./activities";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Button } from "../../components/button";

export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

    function openCreateActivityModalOpen() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModalOpen() {
        setIsCreateActivityModalOpen(false)
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationEndDateHeader />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>

                        <Button onClick={openCreateActivityModalOpen} variant="primary" >
                            <Plus className='size-5' />
                            Cadastrar atividade
                        </Button>

                    </div>
                    <Activities />
                </div>

                <div className="w-80 space-y-6">
                    <ImportantLinks />
                    <div className='w-full h-px bg-zinc-800' />
                    <Guests />
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateActivityModalOpen={closeCreateActivityModalOpen}
                />
            )}
        </div>
    )
}