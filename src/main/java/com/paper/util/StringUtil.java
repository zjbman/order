package com.paper.util;

public class StringUtil {
    public static boolean isEmpty(String content){
        if(content == null || "".equals(content)){
            return true;
        }
        return false;
    }
}
