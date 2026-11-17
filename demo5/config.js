/* Seller settings. This is the file you edit to make the page yours.
   Any text can be written once ('Essential') or in both page languages
   ({ en: 'Essential', es: 'Esencial' }). */
window.STORE_CONFIG = {
  // Your shop name, shown in the header, the footer and the browser tab.
  brand: 'Faith Melody Studio',
  // Your website address (shown in the footer text).
  domain: 'FaithMelodyStudio.com',

  // Where orders are sent. Fill in at least one.
  //   orderEmail: the address that receives order requests.
  //   whatsapp:   your number with country code, digits only, e.g. '15551234567'.
  // While both are empty, buyers can only copy their order as text.
  orderEmail: '',   // e.g. 'pedidos@faithmelodystudio.com'
  whatsapp: '',     // e.g. '15551234567'

  currency: '$',

  // Language the page opens in when the visitor's browser is neither English nor Spanish.
  defaultLanguage: 'en',

  // Song packages. `featured: true` highlights one card.
  packages: [
    {
      id: 'essential', price: 19,
      name: { en: 'Essential', es: 'Esencial' },
      tagline: { en: 'A simple song of blessing.', es: 'Una canción sencilla de bendición.' },
      items: [
        { en: 'One personalized song, about 2 minutes', es: 'Una canción personalizada, de unos 2 minutos' },
        { en: 'MP3 download', es: 'Descarga en MP3' },
        { en: 'Lyric sheet (PDF)', es: 'Hoja con la letra (PDF)' },
        { en: 'Private link to share it', es: 'Enlace privado para compartirla' },
        { en: '1 round of changes', es: '1 ronda de cambios' },
      ],
    },
    {
      id: 'signature', price: 39, featured: true,
      name: 'Signature',
      tagline: { en: 'The full gift, ready to bless.', es: 'El regalo completo, listo para bendecir.' },
      items: [
        { en: 'Everything in Essential', es: 'Todo lo de Esencial' },
        { en: 'A longer song, about 3 minutes', es: 'Una canción más larga, de unos 3 minutos' },
        { en: '2 versions to choose from', es: '2 versiones para elegir' },
        { en: 'Gift page with your note', es: 'Página de regalo con tu mensaje' },
        { en: 'Short lyric video', es: 'Video corto con la letra' },
        { en: 'Printable QR card', es: 'Tarjeta QR para imprimir' },
        { en: '2 rounds of changes', es: '2 rondas de cambios' },
      ],
      includes: ['qr'],
    },
    {
      id: 'deluxe', price: 69,
      name: 'Deluxe',
      tagline: { en: 'For baptisms, weddings and celebrations of life.', es: 'Para bautismos, bodas y celebraciones de vida.' },
      items: [
        { en: 'Everything in Signature', es: 'Todo lo de Signature' },
        { en: 'A full song, 3 to 4 minutes', es: 'Una canción completa, de 3 a 4 minutos' },
        { en: '3 versions to choose from', es: '3 versiones para elegir' },
        { en: 'Photo slideshow video', es: 'Video con tus fotos' },
        { en: 'Your voice before the first note', es: 'Tu voz antes de la primera nota' },
        { en: 'Delivery on the day and time you pick', es: 'Entrega el día y la hora que elijas' },
        { en: 'Studio-quality WAV file', es: 'Archivo WAV con calidad de estudio' },
        { en: '3 rounds of changes', es: '3 rondas de cambios' },
      ],
      includes: ['qr', 'slideshow', 'wav'],
    },
  ],

  // Bigger projects, shown as wide cards under the packages. `from: true` shows "from $249".
  specials: [
    {
      id: 'tribute', price: 149,
      name: { en: 'Church & family tribute', es: 'Tributo de iglesia o familia' },
      text: {
        en: 'For church anniversaries, pastor appreciation, weddings and memorials. Three to five songs, or one song built from everyone’s memories, in a private collection you can download as an album. Each extra contributor is +$10.',
        es: 'Para aniversarios de iglesia, gratitud al pastor, bodas y homenajes. De tres a cinco canciones, o una sola hecha con los recuerdos de todos, en una colección privada que puedes descargar como álbum. Cada participante adicional: +$10.',
      },
    },
    {
      id: 'jingle', price: 249, from: true,
      name: { en: 'Ministry jingle', es: 'Jingle para ministerios' },
      text: {
        en: 'For churches, ministries, Christian podcasts and radio. A 15 to 30 second hook in three cuts, as WAV and MP3, with a written license for business use.',
        es: 'Para iglesias, ministerios, podcasts y radios cristianas. Un gancho de 15 a 30 segundos en tres cortes, en WAV y MP3, con licencia escrita para uso comercial.',
      },
    },
  ],

  // Extras a buyer can add in the order form. `id` links to `includes` above.
  addons: [
    { id: 'qr', price: 7, name: { en: 'Printable QR card', es: 'Tarjeta QR para imprimir' } },
    { id: 'slideshow', price: 19, name: { en: 'Photo slideshow video', es: 'Video con tus fotos' } },
    { id: 'version', price: 7, name: { en: 'Extra song version', es: 'Versión adicional de la canción' } },
    { id: 'verse', price: 7, name: { en: 'Extra verse', es: 'Verso adicional' } },
    { id: 'instrumental', price: 15, name: { en: 'Instrumental version', es: 'Versión instrumental' } },
    { id: 'wav', price: 9, name: { en: 'Studio-quality WAV file', es: 'Archivo WAV con calidad de estudio' } },
    { id: 'artwork', price: 9, name: { en: 'Printable lyric artwork', es: 'Lámina con la letra para imprimir' } },
  ],

  // Reviews from your own buyers. Leave the list empty until you have real ones:
  // the Reviews section and its menu link stay hidden while it is empty.
  //   { name: 'First name L.', about: { en: 'Birthday song for Mom', es: 'Canción de cumpleaños para mamá' },
  //     text: { en: 'What they told you.', es: 'Lo que te dijeron.' } },
  reviews: [],
};
