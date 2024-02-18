
// 处理后端返回歌词
export const HandleLyric = (lyric) => {
    function convertToSeconds(timeArray) {
        // 获取分钟和秒（包括毫秒）  
        const minutes = parseFloat(timeArray[0]); // 使用parseFloat来确保即使分钟有小数部分也能正确处理  
        const secondsWithMilliseconds = parseFloat(timeArray[1]);
        // 计算总秒数  
        const totalSeconds = minutes * 60 + secondsWithMilliseconds;
        return totalSeconds;
    }
    let line = lyric.split('\n')
    let value1 = []
    for (let i = 0; i < line.length; i++) {
        let str = line[i]
        // 把字符串分割为数组
        let part = str.split(']')
        let timestr = part[0].substring(1)
        let parts = timestr.split(':')
        let obj = {
            time: convertToSeconds(parts),
            word: part[1]
        }
        value1.push(obj)
    }
    return value1
}


