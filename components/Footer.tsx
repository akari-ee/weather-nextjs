import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='flex justify-between items-center z-20 bg-slate-400 text-2xl'>
      <div>지도</div>
      <div>슬라이더</div>
      <div>목록</div>
    </div>
  )
}