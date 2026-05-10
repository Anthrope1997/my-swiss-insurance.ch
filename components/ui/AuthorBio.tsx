import ShieldIcon from '@/components/shared/ShieldIcon'
import fr from '@/dictionaries/fr.json'

interface AuthorBioProps {
  publishedDate: string
  updatedDate: string
}

export default function AuthorBio({ publishedDate, updatedDate }: AuthorBioProps) {
  return (
    <div className="py-4 mb-8 border-y border-edge">
      <div className="flex items-center gap-3">

        <div className="w-9 h-9 bg-brand rounded-md flex items-center justify-center shrink-0">
          <ShieldIcon className="w-5 h-5 text-white" />
        </div>

        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-navy">{fr.authorBio.organisation}</p>
          <p className="text-sm text-slate">{fr.authorBio.service}</p>
          <p className="text-sm text-slate">{fr.authorBio.publie} {publishedDate}, {fr.authorBio.miseAJour} {updatedDate}</p>
        </div>

      </div>
    </div>
  )
}
