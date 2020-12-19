﻿using AltV.Net;
using System;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace VnXGlobalSystems.Core
{
    public class Debug
    {
        public static bool DEBUGMODEENABLED = true;
        public static void OutputDebugString(string text)
        {
            try
            {
                if (!DEBUGMODEENABLED) return;
                Console.WriteLine("[" + DateTime.Now.Hour + " : " + DateTime.Now.Minute + " ] : " + text);
            }
            catch { }
        }

        public static void CatchExceptions(Exception ex, [CallerMemberName] string FunctionName = "")
        {
            if (!DEBUGMODEENABLED) return;
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("[EXCEPTION " + FunctionName + "] " + ex.Message);
            Console.WriteLine("[EXCEPTION " + FunctionName + "] " + ex.StackTrace);
            Console.ResetColor();
        }
        public static void OutputLog(string message, ConsoleColor color = ConsoleColor.Yellow)
        {

            var pieces = Regex.Split(message, @"(\[[^\]]*\])");

            for (int i = 0; i < pieces.Length; i++)
            {
                string piece = pieces[i];

                if (piece.StartsWith("[") && piece.EndsWith("]"))
                {
                    Console.ForegroundColor = color;
                    piece = piece.Substring(1, piece.Length - 2);
                }

                Console.Write(piece);
                Console.ResetColor();

            }
            Console.WriteLine();
        }
        public static void WriteLogs(string logname, string strLog)
        {
            try
            {
                if (logname == "Anticheat") OutputLog(strLog, ConsoleColor.Yellow);
                StreamWriter log;
                FileStream fileStream = null;
                DirectoryInfo logDirInfo = null;
                FileInfo logFileInfo;

                //string logFilePath = "C:\\Users\\Administrator\\Desktop\\vnx_log_files\\";
                string logFilePath = Alt.Server.Resource.Path + "/settings/debug/";
                logFilePath = logFilePath + logname + "." + "txt";
                logFileInfo = new FileInfo(logFilePath);
                logDirInfo = new DirectoryInfo(logFileInfo.DirectoryName);
                if (!logDirInfo.Exists) logDirInfo.Create();
                if (!logFileInfo.Exists)
                {
                    fileStream = logFileInfo.Create();
                }
                else
                {
                    fileStream = new FileStream(logFilePath, FileMode.Append);
                }
                log = new StreamWriter(fileStream);
                log.WriteLine(DateTime.Today.ToString("MM-dd-yyyy") + " | " + DateTime.Now.ToString("HH:mm:ss tt") + " | " + strLog);
                log.Close();
            }
            catch { }
        }
    }
}
