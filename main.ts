input.onButtonPressed(Button.A, function () {
    Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Run, L_pow, R_pow)
    basic.pause(runTime)
    Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
})
/**
 * Lモータが基準
 * 
 * Rモータ速度を変化させる
 * 
 * 最大変化量は40%としmax_ofsで与える
 */
function 進路調整 () {
    vol = pins.analogReadPin(AnalogPin.P2)
    serial.writeValue("potenshoMeter", vol)
    if (vol > 511) {
        R_ofs = Math.map(vol, 512, 1023, 0, max_ofs * -1)
    } else {
        R_ofs = Math.map(vol, 0, 511, max_ofs, 0)
    }
    R_ofs = Math.round(R_ofs)
    serial.writeValue("R_ofs", R_ofs)
}
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(R_ofs)
})
input.onButtonPressed(Button.B, function () {
    進路調整()
    Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Run, L_pow, R_pow + R_ofs)
    basic.pause(runTime)
    Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    basic.showNumber(R_ofs)
})
let R_ofs = 0
let vol = 0
let max_ofs = 0
let runTime = 0
let R_pow = 0
let L_pow = 0
basic.showIcon(IconNames.Yes)
L_pow = 50
R_pow = 50
runTime = 3000
max_ofs = R_pow * 0.4
