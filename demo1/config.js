/* Seller settings. This is the only file you need to edit to make the page yours. */
window.STORE_CONFIG = {
  // Your shop name, shown in the header, the footer and the browser tab.
  brand: 'Dear Song',

  // Where orders are sent. Fill in at least one.
  //   orderEmail: the address that receives order requests.
  //   whatsapp:   your number with country code, digits only, e.g. '15551234567'.
  // While both are empty, buyers can only copy their order as text.
  orderEmail: '',
  whatsapp: '',

  currency: '$',

  // Song packages. `featured: true` highlights one card.
  packages: [
    {
      id: 'essential', name: 'Essential', price: 19, tagline: 'A lovely little surprise.',
      items: ['One personalized song, about 2 minutes', 'MP3 download', 'Lyric sheet (PDF)', 'Private link to share it', '1 round of changes'],
    },
    {
      id: 'signature', name: 'Signature', price: 39, featured: true, tagline: 'Our favorite way to give.',
      items: ['Everything in Essential', 'A longer song, about 3 minutes', '2 versions to choose from', 'Gift page with your note', 'Short lyric video', 'Printable QR card', '2 rounds of changes'],
      includes: ['qr'],
    },
    {
      id: 'deluxe', name: 'Deluxe', price: 69, tagline: 'For the once-in-a-lifetime days.',
      items: ['Everything in Signature', 'A full song, 3 to 4 minutes', '3 versions to choose from', 'Photo slideshow video', 'Your voice before the first note', 'Delivery on the day and time you pick', 'Studio-quality WAV file', '3 rounds of changes'],
      includes: ['qr', 'slideshow', 'wav'],
    },
  ],

  // Bigger projects, shown as two wide cards under the packages.
  specials: [
    {
      id: 'tribute', name: 'Family & group tribute', price: 149, icon: 'group',
      text: 'For weddings, retirements, reunions and memorials. Three to five songs, or one song built from everyone’s memories, in a private collection you can download as an album. Each extra contributor is +$10.',
    },
    {
      id: 'jingle', name: 'Business jingle', price: 249, from: true, icon: 'biz',
      text: 'For shops, podcasts and creators. A 15 to 30 second hook in three cuts, as WAV and MP3, with a written license for business use.',
    },
  ],

  // Extras a buyer can add in the order form. `id` links to `includes` above.
  addons: [
    { id: 'qr', name: 'Printable QR card', price: 7 },
    { id: 'slideshow', name: 'Photo slideshow video', price: 19 },
    { id: 'version', name: 'Extra song version', price: 7 },
    { id: 'verse', name: 'Extra verse', price: 7 },
    { id: 'instrumental', name: 'Instrumental version', price: 15 },
    { id: 'wav', name: 'Studio-quality WAV file', price: 9 },
    { id: 'artwork', name: 'Printable lyric artwork', price: 9 },
  ],

  // Choices in the order form.
  occasions: ['Birthday', 'Anniversary', 'Love song', 'Wedding', 'Proposal', 'For Mom', 'For Dad', 'Friendship', 'Graduation', 'New baby',
    'Retirement', 'Thank you', 'Get well soon', 'In memory', 'For a pet', 'Team or office', 'Just because', 'Something else'],
  sounds: ['Surprise me', 'Warm acoustic', 'Feel-good pop', 'R&B and soul', 'Country', 'Rock anthem', 'Latin (bachata, cumbia, merengue, vallenato)', 'Orchestral'],
};
