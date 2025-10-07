export function formatearFecha(fechaStr: string) {
    const fecha = new Date(fechaStr)

    const anho = fecha.getFullYear()
    

    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")

    const hora = String(fecha.getHours()).padStart(2, "0")
    const minutos = String(fecha.getMinutes()).padStart(2, "0")
    
    //const fechaFormateada = `${dia}/${mes}/${anho} ${hora}:${minutos}`
    
    return {
        dia, mes, anho, hora, minutos
    }
}