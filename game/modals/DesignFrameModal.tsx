'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DESIGNS } from '@/lib/data/designs'

interface DesignFrameModalProps {
  refId: string | null
  onOpenChange: (open: boolean) => void
}

export function DesignFrameModal({ refId, onOpenChange }: DesignFrameModalProps) {
  const design = DESIGNS.find((d) => d.id === refId)

  return (
    <Dialog open={Boolean(design)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-amber-500/20 bg-black/90 backdrop-blur-2xl">
        {design && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-white">{design.title}</DialogTitle>
              <DialogDescription className="sr-only">{design.description}</DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image src={design.image} alt={design.title} fill className="object-contain p-4" />
            </div>
            <p className="text-sm leading-relaxed text-white/70">{design.description}</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
