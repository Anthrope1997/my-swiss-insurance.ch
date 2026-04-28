interface AuthorBioProps {
  publishedDate: string
  updatedDate: string
}

export default function AuthorBio({ publishedDate, updatedDate }: AuthorBioProps) {
  return (
    <div className="py-4 mb-8 border-y border-[#e2e8f0]">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">

        {/* Avatar + nom sur la même ligne (mobile) — avatar seul visible (desktop) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0 text-[#1d4ed8] font-semibold text-sm">
            MSI
          </div>
          <p className="text-sm font-medium text-[#0f2040] md:hidden">
            La rédaction My Swiss Insurance
          </p>
        </div>

        {/* Bloc texte — titre masqué sur mobile (affiché dans la ligne avatar) */}
        <div className="flex-1 space-y-0.5">
          <p className="text-sm font-medium text-[#0f2040] hidden md:block">
            La rédaction My Swiss Insurance
          </p>
          <p className="text-xs text-[#475569]">
            Service éditorial indépendant, Lausanne, Suisse romande
          </p>
          <p className="text-xs text-[#475569]">
            Publié le {publishedDate}, mis à jour le {updatedDate}
          </p>
        </div>

        {/* Badge — à droite (desktop), aligné à gauche en bas (mobile) */}
        <div className="shrink-0">
          <span className="bg-[#dbeafe] text-[#1d4ed8] px-2 py-1 rounded text-xs font-medium">
            Données OFSP 2026
          </span>
        </div>

      </div>
    </div>
  )
}
