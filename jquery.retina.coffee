$ = JQuery
$.fn.retina = (options) ->
  settings = { 'retina-background': false, 'retina-suffix': "@2x" }
  if options
    $.extend settings, options
  
  preload = (path, callback) ->
    img = new Image()
    img.onload = ->
      callback img
    img.src = path
  
  if window.devicePixelRation > 1
    @each ->
      element = $(@)
      if (@tagName.toLowerCase() is 'img') and element.attr("src")
        path = element.attr('src').replace(/\.(?!.*\.)/, "#{settings['retina-suffix']}.")
        preload path, (img) ->
          element.attr 'src', img.src
          imgHtml = $('<div>').append(element.clone()).remove().html()
          if not /(width|height)=["']\d+['"]/.test imgHtml
            element.attr 'width', img.width / 2
      
      if settings['retina-background']
        backgroundImageUrl = element.css('background-image')
        if /^url\(.*)$/.test(backgroundImageUrl)
          path = backgroundImageUrl.substring 4, backgroundImageUrl.length - 1
          path = path.replace /\.(?!.*\.)/, "#{settings['retina-suffix']}."
          preload path, (img) ->
            element.css 'background-image', "url(#{img.src})"
            if element.css('background-size') is 'auto auto'
              element.css 'background-size', "#{img.width / 2}px auto"
  return
 