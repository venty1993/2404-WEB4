function getDegree(x,y) {

    const radian = Math.atan2(y,x);
    const degree = radian * 180 / Math.PI;

    return degree
}