import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestModal } from './invite-guest-modal'
import { ConfirmTripModal } from './confirm-trip-modal'

export function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rockeseat.com.br',
    'dkimisima@gmail.com'
  ])

  const navigate = useNavigate();

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function openConfrimTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmaiList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmaiList)
  }

  function createTrip() {
    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="para onde você vai?" className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1" />
            </div>

            <div className='flex items-center gap-2'>
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder:-zinc-400 w-40 outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800' />

            {isGuestInputOpen ? (
              <button onClick={closeGuestInput} className='flex items-center gap-2 bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium hover:bg-zinc-700'>
                Alterar local/data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button onClick={openGuestInput} className='flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400'>
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type='button' onClick={openGuestModal} className='flex items-center gap-2 flex-1 text-left'>
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className='text-zinc-100 text-lg flex-1'>
                    {emailsToInvite.length} pessoas(s) convidada(s)
                  </span>
                ) : (
                  <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
                )}
              </button>

              <div className='w-px h-6 bg-zinc-800' />

              <button onClick={openConfrimTripModal} className='flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400'>
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a></p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}


    </div>
  )
}
