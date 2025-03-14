##
# EPITECH PROJECT, 2024
# undefined
# File description:
# post_export.py
##

import os
import shutil
import sys


def copy_file_up_one_level(file_path):
    file_name = os.path.basename(file_path)
    destination_path = os.path.join(
        os.path.dirname(file_path), '..', file_name)
    shutil.copy2(file_path, destination_path)


def main(provided_export_path):
    manifest_path = os.path.join(provided_export_path, 'manifest.json')
    sitemap_path = os.path.join(provided_export_path, 'sitemap.xml')

    copy_file_up_one_level(manifest_path)
    copy_file_up_one_level(sitemap_path)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        export_path = sys.argv[1]
        main(export_path)
    else:
        print('Please provide the export path as the first argument.')
