
export function date (str) {
  const d = new Date(str)
  
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
  const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 

  return `${da} ${mo} ${ye}`
}


export function thousands (str) {
  return str 
    ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : ''
}
