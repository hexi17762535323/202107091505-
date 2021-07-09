function 巡线左转修正 () {
    if (前进后退) {
        neZha.setMotorSpeed(neZha.MotorList.M2, 巡航速度)
        neZha.setMotorSpeed(neZha.MotorList.M1, 10)
    } else {
        neZha.setMotorSpeed(neZha.MotorList.M2, -10)
        neZha.setMotorSpeed(neZha.MotorList.M1, 巡航速度 * -1)
    }
}
// 启动初始化
function 原地右转 (速度: number) {
    neZha.setMotorSpeed(neZha.MotorList.M1, 速度)
    neZha.setMotorSpeed(neZha.MotorList.M2, 速度 * -1)
}
function 直行观测站 () {
    while (!(找到右转角)) {
        巡线传感器巡线()
    }
    neZha.stopAllMotor()
    转弯标志位清零()
    for (let index = 0; index < 4; index++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.letterCard(PlanetX_AILens.letterCards.A)) {
            读到卡片 = 1
            basic.showString("A")
        } else if (PlanetX_AILens.letterCard(PlanetX_AILens.letterCards.B)) {
            读到卡片 = 1
            basic.showString("B")
        } else if (PlanetX_AILens.letterCard(PlanetX_AILens.letterCards.C)) {
            读到卡片 = 1
            basic.showString("C")
        } else if (读到卡片) {
            break;
读到卡片 = 0
        } else {
            读到卡片 = 0
        }
    }
    basic.pause(2000)
    右转弯()
}
function 直行左转 () {
    while (!(找到左转角)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    左转弯()
}
function 任务4 () {
    if (任务4使能) {
        直行右转()
        直行侦测点()
        直行侦测点()
        任务4使能 = 0
        任务5使能 = 1
        neZha.stopAllMotor()
    }
}
function 左转弯 () {
    前进(30)
    basic.pause(500)
    原地左转(40)
    basic.pause(500)
    while (!(找到跑道)) {
        if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_2) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_1)) {
            找到跑道 = 1
        } else {
            找到跑道 = 0
        }
    }
    找到跑道 = 0
    neZha.stopAllMotor()
}
function 机械臂下降 () {
    // 高度上限70下限10
    neZha.setServoAngel(neZha.ServoTypeList._180, neZha.ServoList.S1, 30)
}
function 原地左转 (速度: number) {
    neZha.setMotorSpeed(neZha.MotorList.M2, 速度)
    neZha.setMotorSpeed(neZha.MotorList.M1, 速度 * -1)
}
function 任务7 () {
    if (任务7使能) {
        十字右转()
        巡航速度 = 80
        任务7使能 = 0
        机械臂下降()
        直行断头()
        neZha.stopAllMotor()
    }
}
function 直行断头 () {
    while (!(找到道路尽头)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    neZha.stopAllMotor()
}
function 放开箱子 () {
    neZha.stopAllMotor()
    basic.pause(500)
    前进(-30)
    basic.pause(1500)
    neZha.stopAllMotor()
    机械臂下降()
    basic.pause(1000)
    机械爪松开()
    basic.pause(500)
    机械臂抬升()
    basic.pause(500)
}
function 直行侦测点 () {
    while (!(找到右转角)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    前进(巡航速度)
    basic.pause(500)
    neZha.stopAllMotor()
    if (PlanetX_Basic.checkCard()) {
        侦测点1 = PlanetX_Basic.readDataBlock()
        basic.showString(侦测点1)
    }
    basic.pause(2000)
}
function 十字左转 () {
    while (!(十字路口)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    左转弯()
}
function 第1块 () {
    十字左转()
    十字左转()
    机械臂下降()
    直行断头()
    夹箱子()
    向后转()
    十字右转()
    十字直行()
    十字右转()
    直行断头()
    放开箱子()
    倒退十字()
    右转弯()
}
function 转弯标志位清零 () {
    找到左转角 = 0
    找到右转角 = 0
    找到跑道 = 0
    找到道路尽头 = 0
    十字路口 = 0
}
function 巡线传感器巡线 () {
    if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_2) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_1)) {
        转弯标志位清零()
        前进(巡航速度 * 前进后退)
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_2) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_3)) {
        转弯标志位清零()
        巡线左转修正()
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_0) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_3) || PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_1) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_3)) {
        转弯标志位清零()
        巡线左转修正()
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_3) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_0) || PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_3) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_1)) {
        转弯标志位清零()
        巡线右转修正()
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_3) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_2)) {
        巡线右转修正()
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_2) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_0)) {
        找到右转角 = 1
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_0) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_1)) {
        找到左转角 = 1
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_0) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_0)) {
        十字路口 = 1
    } else if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_3) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_3)) {
        找到道路尽头 = 1
    } else {
    	
    }
}
function 十字直行 () {
    while (!(十字路口)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    前进(巡航速度)
    basic.pause(500)
}
function 夹箱子 () {
    neZha.stopAllMotor()
    前进(-30)
    basic.pause(500)
    neZha.stopAllMotor()
    basic.pause(1000)
    机械爪夹住()
    basic.pause(1000)
    机械臂抬升()
    basic.pause(500)
    前进(30)
    basic.pause(1000)
    neZha.stopAllMotor()
}
input.onButtonPressed(Button.A, function () {
    启动 = 1
    basic.showLeds(`
        . # . . .
        . # # . .
        . # # # .
        . # # . .
        . # . . .
        `)
})
function 左转直行 () {
    while (!(找到左转角)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    前进(巡航速度)
    basic.pause(500)
}
function 第2块 () {
    十字直行()
    十字直行()
    机械臂下降()
    直行断头()
    夹箱子()
    向后转()
    十字直行()
    十字直行()
    十字直行()
    直行断头()
    放开箱子()
    倒退十字()
    右转弯()
    倒退十字()
    右转弯()
}
function 推箱子 () {
    前进(60)
    basic.pause(1000)
    neZha.stopAllMotor()
    basic.pause(1000)
    前进(-60)
    basic.pause(1000)
    neZha.stopAllMotor()
}
function 任务3 () {
    if (任务3使能) {
        直行右转()
        左转直行()
        机械臂下降()
        直行断头()
        推箱子()
        向后转()
        任务3使能 = 0
        任务4使能 = 1
    }
}
function 机械臂抬升 () {
    // 高度上限70下限10
    neZha.setServoAngel(neZha.ServoTypeList._360, neZha.ServoList.S1, 160)
}
function 第3块 () {
    十字直行()
    十字右转()
    机械臂下降()
    直行断头()
    夹箱子()
    向后转()
    十字左转()
    十字直行()
    十字左转()
    直行断头()
    放开箱子()
    倒退十字()
    左转弯()
}
function 机械爪夹住 () {
    // 机械爪上限60下限20
    neZha.setServoAngel(neZha.ServoTypeList._360, neZha.ServoList.S4, 150)
}
function 任务2 () {
    if (任务2使能) {
        直行观测站()
        任务2使能 = 0
        任务3使能 = 1
    }
}
function 直行右转 () {
    while (!(找到右转角)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    右转弯()
}
function 机械爪松开 () {
    // 机械爪上限60下限20
    neZha.setServoAngel(neZha.ServoTypeList._360, neZha.ServoList.S4, 60)
}
function 前进 (速度: number) {
    // 向前转
    neZha.setMotorSpeed(neZha.MotorList.M2, 速度)
    // 向前转
    neZha.setMotorSpeed(neZha.MotorList.M1, 速度)
}
function 巡线右转修正 () {
    if (前进后退) {
        neZha.setMotorSpeed(neZha.MotorList.M1, 巡航速度)
        neZha.setMotorSpeed(neZha.MotorList.M2, 10)
    } else {
        neZha.setMotorSpeed(neZha.MotorList.M1, -10)
        neZha.setMotorSpeed(neZha.MotorList.M2, 巡航速度 * -1)
    }
}
function 十字右转 () {
    while (!(十字路口)) {
        巡线传感器巡线()
    }
    转弯标志位清零()
    右转弯()
}
input.onButtonPressed(Button.B, function () {
    启动 = 0
    neZha.stopAllMotor()
    basic.showLeds(`
        . . . . .
        . # . # .
        . # . # .
        . # . # .
        . . . . .
        `)
})
function 任务1 () {
    if (任务1使能) {
        直行侦测点()
        任务1使能 = 0
        任务2使能 = 1
    }
}
function 倒退十字 () {
    前进后退 = -1
    neZha.setMotorSpeed(neZha.MotorList.M1, -30)
    neZha.setMotorSpeed(neZha.MotorList.M2, -30)
    while (!(十字路口)) {
        if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_0) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_0)) {
            十字路口 = 1
        }
    }
    前进后退 = 1
    转弯标志位清零()
    neZha.stopAllMotor()
    basic.pause(500)
}
function 任务6 () {
    if (任务6使能) {
        十字右转()
        直行侦测点()
        第1块()
        第2块()
        第3块()
        任务6使能 = 0
        任务7使能 = 1
    }
}
function 向后转 () {
    原地右转(30)
    basic.pause(500)
    while (!(找到跑道)) {
        if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_2) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_1)) {
            找到跑道 = 1
        } else {
            找到跑道 = 0
        }
    }
    找到跑道 = 0
    neZha.stopAllMotor()
}
function 右转弯 () {
    前进(30)
    basic.pause(500)
    原地右转(40)
    basic.pause(500)
    while (!(找到跑道)) {
        if (PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.TrackingStateType.Tracking_State_2) && PlanetX_Basic.trackingSensor(PlanetX_Basic.DigitalRJPin.J2, PlanetX_Basic.TrackingStateType.Tracking_State_1)) {
            找到跑道 = 1
        } else {
            找到跑道 = 0
        }
    }
    找到跑道 = 0
    neZha.stopAllMotor()
}
function 任务5 () {
    if (任务5使能) {
        十字左转()
        十字左转()
        机械臂下降()
        直行断头()
        夹箱子()
        向后转()
        直行右转()
        十字直行()
        直行断头()
        放开箱子()
        向后转()
        任务5使能 = 0
        任务6使能 = 1
        neZha.stopAllMotor()
    }
}
let 读到卡片 = 0
let 侦测点1 = ""
let 巡航速度 = 0
let 前进后退 = 0
let 启动 = 0
let 找到跑道 = 0
let 找到道路尽头 = 0
let 十字路口 = 0
let 找到左转角 = 0
let 找到右转角 = 0
let 任务7使能 = 0
let 任务6使能 = 0
let 任务5使能 = 0
let 任务4使能 = 0
let 任务3使能 = 0
let 任务2使能 = 0
let 任务1使能 = 0
任务1使能 = 0
任务2使能 = 0
任务3使能 = 0
任务4使能 = 0
任务5使能 = 0
任务6使能 = 0
任务7使能 = 0
let 巡线 = 0
let 计数器 = 0
找到右转角 = 0
找到左转角 = 0
十字路口 = 0
找到道路尽头 = 0
let 找到侦测点 = 0
找到跑道 = 0
let 观测站 = ""
启动 = 0
巡线 = 0
// 前进为1 后退为-1
前进后退 = 1
机械臂抬升()
机械爪松开()
巡航速度 = 30
侦测点1 = ""
读到卡片 = 0
任务1使能 = 1
PlanetX_AILens.initModule()
PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Card)
basic.showIcon(IconNames.Heart)
// 巡线
basic.forever(function () {
    if (启动 == 1) {
        任务1()
        任务2()
        任务3()
        任务4()
        任务5()
        任务6()
        任务7()
    } else {
        neZha.stopAllMotor()
    }
})
