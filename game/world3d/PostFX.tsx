'use client'

import { Bloom, EffectComposer, SSAO, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

/** Shared postprocessing stack: bloom for the neon emissives, SSAO for
 * contact/depth shading between props and walls, and a soft vignette to
 * keep focus on the player. Kept deliberately light (low sample counts) so
 * it stays smooth on mid-range/mobile GPUs. */
export function PostFX() {
  return (
    <EffectComposer enableNormalPass multisampling={0}>
      <SSAO radius={0.28} intensity={16} luminanceInfluence={0.5} bias={0.02} color={new THREE.Color('black')} />
      <Bloom mipmapBlur luminanceThreshold={0.4} luminanceSmoothing={0.25} intensity={0.6} radius={0.6} />
      <Vignette eskil={false} offset={0.25} darkness={0.62} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  )
}
