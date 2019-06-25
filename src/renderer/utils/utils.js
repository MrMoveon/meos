
import electron from 'electron'
import {exec} from 'child_process'
import dayjs from 'dayjs'
import fileIconMap from '../config/fileIconMap'
const { webFrame, screen } = electron
const path = require('path')
const fs = require('fs-extra')
const iconv = require('iconv-lite')
/**
 * 设置窗口的缩放
 */
export const setZoom = () => {
  var devInnerHeight = 1080.0 // 开发时的InnerHeight
  var devDevicePixelRatio = 1.0// 开发时的devicepixelratio
  var devScaleFactor = 1.5 // 开发时的ScaleFactor
  var scaleFactor = screen.getPrimaryDisplay().scaleFactor
  var zoomFactor = (window.innerHeight / devInnerHeight) * (window.devicePixelRatio / devDevicePixelRatio) * (devScaleFactor / scaleFactor)
  webFrame.setZoomFactor(zoomFactor)
}
/**
 * 获取盘符
 */
export const getDisk = () => {
  return new Promise((resolve, reject) => {
    // exec('wmic logicaldisk where drivetype=3 get deviceid', (err, stdout, stderr) => {
    //   if (err || stderr) {
    //     let error = 'root path open failed' + err + stderr
    //     reject(error)
    //     return
    //   }
    //   let con = stdout.toString().trim()
    //   let arr = con.split('\n')
    //   let disk = []
    //   arr.filter(item => {
    //     if (item.indexOf('DeviceID') === -1) {
    //       disk.push(item.toString().slice(0, 2))
    //     }
    //   })
    //   resolve(disk)
    // })
    exec("WMIC LOGICALDISK WHERE MEDIATYPE='12' GET DESCRIPTION,DEVICEID,FILESYSTEM,SIZE,FREESPACE", { encoding: 'buffer' }, (err, stdout) => {
      if (err) {
        let error = 'root path open failed' + err
        reject(error)
        return
      }
      let stdoutIconv = iconv.decode(stdout, 'cp936')
      let con = stdoutIconv.toString().trim()
      let disk = con.split('\n')
      var diskData = []
      var reg = /([^a-zA-Z0-9_\s]+)\s+([a-zA-Z]:)\s+[a-zA-Z]+\s+(\d+)\s+(\d+)/i
      disk.forEach(item => {
        var data = reg.exec(item)
        if (data) {
          diskData.push({
            zh: data[1],
            en: data[2],
            spaceAvailable: data[3],
            total: data[4]
          })
        }
      })
      resolve(diskData)
    })
  })
}

/**
 * 得到文件夹下面的所有文件目录列表
 */
export const getDirList = async (dir) => {
  try {
    let result = await fs.readdir(dir)
    return result
  } catch (err) {
    console.error(err)
  }
}
/**
 * 获取文件信息
 */

export const getStats = async (dir, name) => {
  let _path = path.resolve(dir, name)
  try {
    // 某些文件无权限访问，
    await fs.access(_path, fs.constants.R_OK)

    let stats = await fs.stat(_path)
    // console.log(stats)
    let {size, birthtime, ctimeMs} = stats
    let isFile = stats.isFile()
    let isDirectory = stats.isDirectory()

    let isBlockDevice = stats.isBlockDevice()
    // 获取后缀
    let ext = path.extname(_path).replace('.', '')
    let extIcon = ''
    if (ext === '') {
      if (isDirectory) {
        extIcon = 'icon-folder'
        size = '-'
      } else {
        extIcon = 'icon-file'
        size = formatSize(size)
      }
    } else {
      extIcon = fileIconMap[ext] || 'icon-file_cloud'
      size = formatSize(size)
    }

    return {key: name, name, size, birthtime, ctimeMs: dayjs(ctimeMs).format('YYYY-MM-DD HH:mm:ss'), isFile, isDirectory, isBlockDevice, path: _path, ext: ext.toLocaleLowerCase(), extIcon}
  } catch (err) {
    console.log(err)
  }
}

/**
 * 文件分组
 */
export const fileGroup = (data) => {
  let group = {}
  let keys = []
  for (const key in fileIconMap) {
    group[key] = []
    keys.push(key)
  }
  group['other'] = []
  let fileData = [...data]
  fileData.filter(item => {
    let index = keys.indexOf(item.ext)
    if (index > -1) {
      group[item.ext].push(item)
    } else {
      group['other'].push(item)
    }
  })
  return group
}

/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。
 *    如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 */
export const formatSize = (size, pointLength, units) => {
  var unit
  units = units || [ 'B', 'K', 'M', 'G', 'TB' ]
  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024
  }
  return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
}

/**
 * 获取索引
 */
export const getIndex = (arr, val) => {
  return arr.indexOf(val)
}
