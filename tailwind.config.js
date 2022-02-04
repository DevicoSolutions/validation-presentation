const dashboardMainColor = '#006218'
const gamesMainColor = '#390049'
const settingsMainColor = '#001E9E'

module.exports = {
  content: ['../**/src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Montserrat Bold', 'sans-serif'],
      },
      colors: {
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#cd7f32',
        dashboard: dashboardMainColor,
        games: gamesMainColor,
        gamesPrimary: '#6E7BF2',
        settings: settingsMainColor,
      },
    },
  },
  plugins: [],
}
