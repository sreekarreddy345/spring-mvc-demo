package com.sreekar.controllers;

public class Demo {
    int a = 012;

    public static void main(String[] args) {
        Demo demo = new Demo();
        demo.go(20);
    }

    void go(final int i) {
        System.out.println(i / a);
    }

}
