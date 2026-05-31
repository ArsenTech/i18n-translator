export default class ViewActions {
     public static zoomIn() {
          document.body.style.zoom = `${Number(document.body.style.zoom || 1) + 0.1}`
     }
     public static zoomOut() {
          document.body.style.zoom = `${Math.max(
               0.5,
               Number(document.body.style.zoom || 1) - 0.1
          )}`
     }
     public static resetZoom() {
          document.body.style.zoom = "1"
     }
}