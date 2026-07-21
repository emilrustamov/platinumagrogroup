// plugins/auto-lazy-images.js
//
// Vite-плагин: автоматически добавляет loading="lazy" ко ВСЕМ <img> тегам
// во ВСЕХ .vue файлах проекта на этапе сборки — вручную ничего редактировать не нужно.
//
// ВАЖНО: картинки первого экрана (hero) НЕ должны быть lazy — иначе сайт
// будет казаться медленнее (браузер откладывает их загрузку без причины).
// Чтобы явно исключить картинку из этого правила, укажите в самом теге:
//   <img src="..." loading="eager" />
// Плагин видит, что атрибут loading уже есть, и не трогает такой тег.

export default function autoLazyImages() {
    return {
      name: 'auto-lazy-images',
      // enforce: 'pre' — выполняем ДО того, как @vitejs/plugin-vue скомпилирует .vue в JS
      enforce: 'pre',
  
      transform(code, id) {
        // Работаем только с .vue файлами
        if (!id.endsWith('.vue')) return null
  
        // Регулярка ищет открывающие теги <img ...> (включая самозакрывающиеся <img ... />)
        // и проверяет, что у них ЕЩЁ НЕТ атрибута loading
        const imgTagRegex = /<img\b((?:[^>]*?))\/?>/gi
  
        let changed = false
        const newCode = code.replace(imgTagRegex, (fullMatch, attrs) => {
          // Если loading уже указан (loading="lazy" или loading="eager" или :loading="...") — не трогаем
          if (/\bloading\s*=/.test(attrs)) {
            return fullMatch
          }
  
          changed = true
          // Вставляем loading="lazy" перед закрывающей частью тега
          const closing = fullMatch.trim().endsWith('/>') ? ' />' : '>'
          const attrsTrimmed = attrs.trim()
          return `<img ${attrsTrimmed} loading="lazy"${closing}`
        })
  
        if (!changed) return null
  
        return {
          code: newCode,
          map: null
        }
      }
    }
  }