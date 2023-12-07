import React from 'react'

type FooterProps = {
    language: boolean;
}

const Footer: React.FC <FooterProps> = ({language}) => {
  return (
    <div>{language ? "Created by Edwille Báez 2023 ©" : "Creado por Edwille Báez 2023 ©"}</div>
  )
}

export default Footer