// LightDark.js - Note this is a .js file, not .tsx
export default function ThemeToggleSlider() {
  return {
    // This runs when the component is loaded on the client side
    init() {
      // Get initial theme
      const storedTheme = localStorage.getItem('theme') || 'dark';
      this.updateToggleState(storedTheme);
      
      // Add event listener to the toggle
      document.getElementById('theme-toggle').addEventListener('change', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update document class
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Update toggle state
        this.updateToggleState(newTheme);
      });
    },
    
    updateToggleState(theme) {
      const toggle = document.getElementById('theme-toggle');
      if (toggle) {
        toggle.checked = theme === 'dark';
      }
      
      const icon = document.getElementById('theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '🌙' : '☀️';
      }
    }
  };
}
// import { useState, useEffect } from 'react'

// export default function ThemeToggleSlider() {

//   const [theme, setTheme] = useState('dark')

//   useEffect(() => {
//     setTheme(localStorage.getItem('theme') ?? 'dark')
//   }, [])

//   return (
//     <div className="fixed top-4 right-4 z-50  p-4"> 
//       <label className="relative inline-flex items-center cursor-pointer">
//         <input 
//           type="checkbox" 
//           className="sr-only peer" 
//           checked={theme === 'dark'}
//           onChange={() => {
//             const newTheme = theme === 'light' ? 'dark' : 'light'
//             setTheme(newTheme)
//             localStorage.setItem('theme', newTheme)
//             document.documentElement.classList.toggle('dark')
//           }}
//         />
//         <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-700 peer-checked:bg-blue-600"></div>
//       </label>
//     </div>
//   )
// }