function Update-GitRepositories {

    <#
    .SYNOPSIS
        Updates all .git repositories at a given path by pulling the latest changes
        from the main/master branch.
    
    .DESCRIPTION
        Update-GitRepositories searches all directories at the given path (the
        default path is the path where this command is executed) if the directory
        contains a git repository (.git folder). If a .git folder is present in
        the directory, this command will stash any git changes, switch to the main/
        master branch, pull the latest changes from git, and revert back to the
        original git branch the repository was in before moving on to the next
        repository.    

    .PARAMETER Path
        The path at which to execute this function at. By default, this value is
        the current directory.

    .EXAMPLE
        Update-GitRepositories

    .EXAMPLE
        Update-GitRepositories -Path "C:\Users\Me\repos"

    .INPUTS
        String
    
    #>

    [CmdletBinding(SupportsShouldProcess)]
    param(
        [ValidateNotNullOrEmpty()]
        [string]$Path = (Get-Location)
    )

    BEGIN {}

    PROCESS {

        # Pulls all folders at the given path that contain a .git folder
        $GitFolders = @(Get-ChildItem -Path (Get-Location) -Directory | Where-Object {Get-ChildItem -Path ($_ | Select-Object -ExpandProperty FullName) -Directory -Hidden -Filter .git})

        $ExecutingDirectory = Get-Location

        # Pulls the latest code from git
        foreach ($Folder in $GitFolders) {

            Write-Verbose -Message "Processing $($Folder)"
            Set-Location -LiteralPath $Folder

            # Saves our current and main/master branch of the repository
            $CurrentGitBranch = git branch --show-current
            $GitMainBranch = git branch | Where-Object { -Not $_.Contains("/") -and ($_.EndsWith("main") -or $_.EndsWith("master")) }    

            # If we cannot find the main branch, skip over this repository
            if ($NULL -eq $GitMainBranch) {
                continue
            }

            # Optionally remove the '*' or ' ' characters to get the true branch name
            $GitMainBranch = $GitMainBranch -Replace '[* ]', ''
            $NeedsToGitCheckout = $CurrentGitBranch -ne $GitMainBranch

            if ($NeedsToGitCheckout -eq $TRUE) {

                # Switch to our main branch
                git checkout $GitMainBranch
            }

            # Save any pending changes
            $GitStash = git stash

            $GitPull = git pull

            # Short-circuit if we have the latest changes
            if ($GitPull -eq "Already up to date.") {        
                if ($NeedsToGitCheckout -eq $TRUE) {
                    git checkout $CurrentGitBranch
                }

                continue
            }

            # Revert pending changes
            if ($GitStash -ne "No local changes to save") {
                git stash pop
            }

            if ($NeedsToGitCheckout -eq $TRUE) {
    
                # Switch back to our existing branch
                git checkout $CurrentGitBranch
            }
        }

        # Reset our execution directory
        Set-Location -LiteralPath $ExecutingDirectory
    }

    END {}    
}