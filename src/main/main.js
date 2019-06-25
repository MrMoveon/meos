import { webFrame, screen } from 'electron'

export const setZoom = () => {
  var devInnerHeight = 1080.0 // 开发时的InnerHeight
  var devDevicePixelRatio = 1.0// 开发时的devicepixelratio
  var devScaleFactor = 1.3 // 开发时的ScaleFactor
  var scaleFactor = screen.getPrimaryDisplay().scaleFactor
  var zoomFactor = (window.innerHeight / devInnerHeight) * (window.devicePixelRatio / devDevicePixelRatio) * (devScaleFactor / scaleFactor)
  webFrame.setZoomFactor(zoomFactor)
}
